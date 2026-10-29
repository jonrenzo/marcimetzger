import Image from "next/image";

// Add files to public/images, then set a src (for example /images/hero.jpg).
// Describe the actual photograph in alt when replacing a slot.
const images = {
  hero: { src: "/images/hero_test.jpeg", alt: "", label: "Your Pahrump home photograph" },
  aerial: { src: "/images/listing.jpeg", alt: "", label: "Your wide Pahrump landscape photograph" },
  portrait: { src: "/images/marcy.jpeg", alt: "", label: "Your portrait of Marci" },
  buying: { src: "/images/property2.jpeg", alt: "", label: "Your home interior photograph" },
  selling: { src: "/images/property1.jpeg", alt: "", label: "Your property exterior photograph" },
  exterior: { src: "/images/residential.jpeg", alt: "", label: "Your exterior photograph" },
  interior: { src: "/images/interior.jpeg", alt: "", label: "Your interior photograph" },
  landscape: { src: "/images/landscape.jpeg", alt: "", label: "Your Pahrump landscape photograph" },
  details: { src: "/images/detail.jpeg", alt: "", label: "Your architectural detail photograph" },
  living: { src: "/images/interior2.jpeg", alt: "", label: "Your living room photograph" },
  outdoor: { src: "/images/outside.jpeg", alt: "", label: "Your outdoor space photograph" },
};

export function ImageSlot({
  name,
  className = "",
}: {
  name: keyof typeof images;
  className?: string;
}) {
  const image = images[name];
  return (
    <div className={`image-slot image-${name} ${className}`}>
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={
            name === "hero" || name === "aerial"
              ? "100vw"
              : "(max-width: 991px) 100vw, 50vw"
          }
          priority={name === "hero"}
        />
      ) : (
        <>
          <span className="slot-label">Image placeholder</span>
          <div className="slot-center">
            <svg
              viewBox="0 0 64 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden="true"
            >
              <rect x="1" y="1" width="62" height="46" rx="1" />
              <circle cx="45" cy="13" r="4" />
              <path d="m1 36 17-18 18 19 11-11 16 17" />
            </svg>
            <span>{image.label}</span>
          </div>
          <span className="slot-corner" aria-hidden="true">
            +
          </span>
        </>
      )}
    </div>
  );
}

export function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      className={`arrow${down ? " arrow-down" : ""}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="M4 12h15M13 5l7 7-7 7" />
    </svg>
  );
}

export function Ridge() {
  return (
    <Image
      src="/images/logo.png"
      alt=""
      width={1071}
      height={334}
      aria-hidden="true"
    />
  );
}
