// import Image from "next/image";

import FloatingActionButton from "@/components/floating-button";
import Todo from "@/components/Todo/layout";

export default function Home() {
  return (
    <div className="bg-primary-200 w-full sm:pt-[100px] pt-[80px]">
        <FloatingActionButton/>
      <Todo/>
    </div>
  );
}
