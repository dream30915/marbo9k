export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          line_user_id: string | null;
          avatar_url: string | null;
          updated_at: string;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          line_user_id?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          line_user_id?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          image_url: string | null;
          stock: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          image_url?: string | null;
          stock?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          price?: number;
          image_url?: string | null;
          stock?: number;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          status: string;
          total_amount: number;
          line_user_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          status?: string;
          total_amount: number;
          line_user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string | null;
          status?: string;
          total_amount?: number;
          line_user_id?: string | null;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          unit_price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          unit_price: number;
          created_at?: string;
        };
        Update: {
          quantity?: number;
          unit_price?: number;
        };
      };
    };
  };
}

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
