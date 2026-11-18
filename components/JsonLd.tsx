/**
 * Renders a JSON-LD <script> (Phase 2.3). Server component; the payload is our
 * own structured data, so dangerouslySetInnerHTML is safe here.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
