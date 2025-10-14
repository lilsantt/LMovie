import BackdropGallery from "@/components/BackdropGallery/BackdropGallery";
import Container from "@/components/Container/Container";
import { NotFound } from "@/components/NotFound/NotFound";
import PersonInfo from "@/components/PersonInfo/PersonInfo";
import Section from "@/components/Section/Section";
import Tabs from "@/components/Tabs/Tabs";
import { getCachedPersonDetails } from "@/utils/getCachedQueries";
import { Metadata } from "next";
import React, { Suspense } from "react";

type PersonProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: PersonProps): Promise<Metadata> {
  const personDetails = await getCachedPersonDetails(params.id);
  if (!personDetails) {
    return {
      title: "Персона не найдена",
      description: "Информация о персоне недоступна.",
    };
  }

  const title = `${personDetails.name} — фильмы, сериалы, биография`;
  const description = personDetails.biography
    ? personDetails.biography.slice(0, 160) + "..."
    : `Информация о ${personDetails.name}: фильмы, сериалы, фото.`;

  return {
    title,
    description,
  };
}

const PersonPage = async ({ params }: PersonProps) => {
  const { id } = params;
  const personDetails = await getCachedPersonDetails(id);
  if (!personDetails) return <NotFound type="PERSON" />;

  return (
    <div>
      <Container>
        <Section>
          <PersonInfo personDetails={personDetails} />
        </Section>
        <Section title="Изображения">
          <Suspense
            fallback={
              <div
                style={{ textAlign: "center", color: "red", fontSize: "40px" }}
              >
                Загрузка...
              </div>
            }
          >
            <BackdropGallery backdrops={personDetails.images.profiles} />
          </Suspense>
        </Section>
        {personDetails.combined_credits?.cast.length > 0 ||
        personDetails.combined_credits?.crew.length > 0 ? (
          <Section title={`Работы с участием ${personDetails?.name}`}>
            <Tabs
              cast={personDetails.combined_credits.cast}
              crew={personDetails.combined_credits.crew}
            />
          </Section>
        ) : null}
      </Container>
    </div>
  );
};

export default PersonPage;
