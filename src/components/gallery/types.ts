export type MediaItem = {
  id: string | number;
  src?: string;
  poster?: string;
  alt?: string;
  label: string;
  tall: boolean;
  type: "image" | "video";
};

export type GridEntry =
  | { type: "media"; data: MediaItem }
  | { type: "text"; textData: { text: string; subtext: string } }
  | { type: "divider" };

const IMAGES: MediaItem[] = [
  {
    id: 1,
    src: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/3237b0ac-65e5-4c26-bc63-5e866186fc7d.jpg",
    alt: "Паста карбонара",
    label: "Паста карбонара",
    tall: true,
    type: "image",
  },
  {
    id: 2,
    src: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/5eeff636-ba38-4387-a127-e006b8d29cbf.jpg",
    alt: "Атмосфера ресторана",
    label: "Живая атмосфера",
    tall: false,
    type: "image",
  },
  {
    id: 3,
    src: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/8b4f0695-7d2f-4fa3-bb71-3fd22a21179e.jpg",
    alt: "Шеф-повар",
    label: "Искусство подачи",
    tall: false,
    type: "image",
  },
  {
    id: 4,
    src: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/0369352b-5ec7-4540-b174-7136f2fce437.jpg",
    alt: "Красное вино",
    label: "Избранное вино",
    tall: true,
    type: "image",
  },
  {
    id: 5,
    src: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/493b1105-b0a2-4c52-8a1e-2764c978a1cf.jpg",
    alt: "Хлебная корзина",
    label: "Домашний хлеб",
    tall: false,
    type: "image",
  },
];

const VIDEO_PLACEHOLDERS: MediaItem[] = [
  {
    id: "v1",
    type: "video",
    poster: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/8b4f0695-7d2f-4fa3-bb71-3fd22a21179e.jpg",
    label: "Магия кухни",
    tall: false,
  },
  {
    id: "v2",
    type: "video",
    poster: "https://cdn.poehali.dev/projects/3b636f09-869d-4952-ac1a-30b58578bbac/files/5eeff636-ba38-4387-a127-e006b8d29cbf.jpg",
    label: "Вечер в ресторане",
    tall: true,
  },
];

export const TEXT_CARDS = [
  { text: "Каждое блюдо — история, рождённая из огня и терпения", subtext: "философия кухни" },
  { text: "Сезонные продукты. Живой вкус. Без компромиссов", subtext: "наш подход" },
  { text: "Место, где время замедляется и вкус становится главным", subtext: "атмосфера" },
  { text: "Традиции и новаторство на одной тарелке", subtext: "о нас" },
];

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateBatch(seed: number): MediaItem[] {
  const allItems: MediaItem[] = [...IMAGES, ...VIDEO_PLACEHOLDERS];
  return shuffleArray(allItems).map((item, i) => ({
    ...item,
    id: `${item.id}-${seed}-${i}`,
  }));
}

export const textIndexRef = { current: 0 };

export function buildGridEntries(mediaItems: MediaItem[], batchNum: number): GridEntry[] {
  const result: GridEntry[] = [];
  mediaItems.forEach((item, i) => {
    result.push({ type: "media", data: item });
    if ((i + 1) % 4 === 0) {
      const tIdx = textIndexRef.current % TEXT_CARDS.length;
      result.push({ type: "text", textData: TEXT_CARDS[tIdx] });
      textIndexRef.current++;
      if (batchNum > 0) {
        result.push({ type: "divider" });
      }
    }
  });
  return result;
}
