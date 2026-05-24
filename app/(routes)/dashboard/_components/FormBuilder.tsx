"use client";
import React, { useState } from "react";
import { Loader } from "lucide-react";
import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useBuilder } from "@/context/builder-provider";
import Builder from "./Builder";
import BuilderDragOverlay from "./BuilderDragOverlay";

const FormBuilder = () => {
  const { loading, formData } = useBuilder();
  const isPublished = formData?.published;

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  });

  const sensors = useSensors(mouseSensor);

  const [isSidebarOpen, setIsSidebarOpen] = useState(
    isPublished ? false : true
  );

  if (loading) {
    return (
      <div className="flex h-56 w-full items-center justify-center">
        <Loader size="3rem" className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <DndContext sensors={sensors}>
        <BuilderDragOverlay />

        <SidebarProvider
          open={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
          className="h-[calc(100vh_-_64px)] "
          style={
            {
              "--sidebar-width": "300px",
              "--sidbar-height": "40px",
            } as React.CSSProperties
          }
        >
          <Builder {...{ isSidebarOpen }} />
        </SidebarProvider>
      </DndContext>
    </div>
  );
};

export default FormBuilder;