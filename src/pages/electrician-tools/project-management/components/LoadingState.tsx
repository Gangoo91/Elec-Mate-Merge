
export const LoadingState = () => {
  return (
    <div className="flex justify-center items-center p-12">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-elec-yellow/20 border-t-elec-yellow animate-spin"></div>
        <p className="text-muted-foreground">Loading your projects...</p>
      </div>
    </div>
  );
};
