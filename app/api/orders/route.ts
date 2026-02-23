import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { line_user_id, items } = body as {
      line_user_id?: string | null;
      items: Array<{ product_id: string; quantity: number; unit_price: number }>;
    };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "ไม่มีรายการสินค้า" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const totalAmount = items.reduce((s, i) => s + i.quantity * i.unit_price, 0);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        line_user_id: line_user_id || null,
        user_id: null,
        status: "pending",
        total_amount: totalAmount,
      })
      .select("id")
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: orderError?.message || "สร้างออเดอร์ไม่สำเร็จ" },
        { status: 500 }
      );
    }

    // ตัดสต็อกสินค้า
    for (const item of items) {
      const { data: product } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.product_id)
        .single();
      
      if (product) {
        await supabase
          .from("products")
          .update({ stock: Math.max(0, product.stock - item.quantity) })
          .eq("id", item.product_id);
      }
    }

    const orderItems = items.map((i) => ({
      order_id: order.id,
      product_id: i.product_id,
      quantity: i.quantity,
      unit_price: i.unit_price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      await supabase.from("orders").delete().eq("id", order.id);
      return NextResponse.json(
        { error: itemsError.message || "บันทึกรายการไม่สำเร็จ" },
        { status: 500 }
      );
    }

    return NextResponse.json({ order_id: order.id });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lineUserId = searchParams.get("line_user_id");

    const supabase = await createClient();

    let query = supabase
      .from("orders")
      .select(`
        id,
        status,
        total_amount,
        created_at,
        order_items (
          quantity,
          unit_price,
          products ( name )
        )
      `)
      .order("created_at", { ascending: false })
      .limit(20);

    if (lineUserId) {
      query = query.eq("line_user_id", lineUserId);
    }

    const { data: orders, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const normalized = (orders || []).map((o) => {
      const { order_items, ...rest } = o as { order_items?: unknown[] };
      return { ...rest, items: order_items || [] };
    });

    return NextResponse.json({ orders: normalized });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}
