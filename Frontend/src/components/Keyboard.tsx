export default function Keyboard() {

    return (
    <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex leading-5 h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          Enter
        </kbd>
        {" "}to add to the list
      </p>  
    )
}


