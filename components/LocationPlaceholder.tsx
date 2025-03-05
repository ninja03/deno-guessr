import { JSX } from "preact";

interface LocationPlaceholderProps {
  locationId: string;
  name: string;
  className?: string;
}

export function LocationPlaceholder(props: LocationPlaceholderProps) {
  return (
    <div
      class={`location-placeholder w-full h-full ${props.className ?? ""}`}
      data-location={props.locationId}
    >
      <div class="text-2xl">{props.name}</div>
      <div class="text-sm mt-2">Placeholder Image</div>
    </div>
  );
}
