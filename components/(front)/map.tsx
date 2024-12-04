"use client";

import { Loader } from "lucide-react";

import { useHasMounted } from "@/hooks/use-has-mounted";

export const Map = () => {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return (
      <div className="flex justify-center items-center w-full h-[450px]">
        <Loader className="animate-spin" aria-busy="true" />
      </div>
    );
  }

  return (
    <article
      style={{
        width: "100%",
        height: "450px",
        overflow: "hidden",
        borderRadius: "8px",
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3089.453008267648!2d32.029903272918176!3d49.404541726398506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d14955cd49f4ab%3A0x23deb69fa5958e18!2z0KLQntCSIMKr0J3QktCkIMKr0J_QvtC60YDQvtCywrs!5e0!3m2!1sru!2sua!4v1733329603261!5m2!1sru!2sua"
        width="100%"
        height="100%"
        style={{ border: "0" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Map"
      />
    </article>
  );
};
