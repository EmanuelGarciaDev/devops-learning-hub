import { getConcept } from "@/data/loader";
import { notFound } from "next/navigation";
import ConceptView from "@/components/ConceptView";

interface Props {
  params: Promise<{ conceptId: string }>;
}

export default async function ConceptPage({ params }: Props) {
  const { conceptId } = await params;
  const concept = await getConcept(conceptId);
  
  if (!concept) {
    notFound();
  }

  return <ConceptView concept={concept} />;
}
