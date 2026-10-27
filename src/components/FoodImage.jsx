export default function FoodImage({ src, alt, className, loading }) {
  function showFallback(event) {
    const image = event.currentTarget;
    image.onerror = null;
    image.src = "/food-placeholder.svg";
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      onError={showFallback}
    />
  );
}
