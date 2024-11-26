"use client";
import React from "react";
import { useEffect } from "react";
import { supabase } from "../config/supabase";
import { useState } from "react";
export default function page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function init() {
      const { data: user, error } = await supabase.from("User").select("*");

      if (error) {
        console.error(Error);
      } else {
        setData(user);
        console.log(data);
      }
    }
    init()
  }, []);

  return <div>page</div>;
}
