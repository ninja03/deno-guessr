export interface Location {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description?: string;
  imageUrl: string;
  region: string;
}

// 世界中の興味深い場所の厳選リスト
export const locations: Location[] = [
  {
    id: 1,
    latitude: 35.6895,
    longitude: 139.6917,
    name: "東京タワー",
    description: "日本の東京にある象徴的な格子状タワー",
    imageUrl: "/locations/tokyo_tower.jpg",
    region: "アジア",
  },
  {
    id: 2,
    latitude: 48.8584,
    longitude: 2.2945,
    name: "エッフェル塔",
    description: "パリのシャン・ド・マルスにある有名な鉄格子塔",
    imageUrl: "/locations/eiffel_tower.jpg",
    region: "ヨーロッパ",
  },
  {
    id: 3,
    latitude: 40.7128,
    longitude: -74.0060,
    name: "ニューヨーク",
    description: "マンハッタンの賑やかな通り",
    imageUrl: "/locations/new_york.jpg",
    region: "北アメリカ",
  },
  {
    id: 4,
    latitude: -33.8568,
    longitude: 151.2153,
    name: "シドニー・オペラハウス",
    description: "シドニーにある象徴的な舞台芸術センター",
    imageUrl: "/locations/sydney_opera.jpg",
    region: "オーストラリア",
  },
  {
    id: 5,
    latitude: -13.1631,
    longitude: -72.5450,
    name: "マチュピチュ",
    description: "ペルーにある15世紀のインカ帝国の城塞",
    imageUrl: "/locations/machu_picchu.jpg",
    region: "南アメリカ",
  },
  {
    id: 6,
    latitude: -33.9249,
    longitude: 18.4241,
    name: "ケープタウン",
    description: "南アフリカの沿岸都市",
    imageUrl: "/locations/cape_town.jpg",
    region: "アフリカ",
  },
  {
    id: 7,
    latitude: 51.5074,
    longitude: -0.1278,
    name: "ロンドン・アイ",
    description: "テムズ川南岸にある巨大な観覧車",
    imageUrl: "/locations/london_eye.jpg",
    region: "ヨーロッパ",
  },
  {
    id: 8,
    latitude: 25.1972,
    longitude: 55.2744,
    name: "ブルジュ・ハリファ",
    description: "ドバイにある世界一高いビル",
    imageUrl: "/locations/burj_khalifa.jpg",
    region: "アジア",
  },
  {
    id: 9,
    latitude: 37.8199,
    longitude: -122.4783,
    name: "ゴールデンゲートブリッジ",
    description: "ゴールデンゲート海峡にかかる吊り橋",
    imageUrl: "/locations/golden_gate.jpg",
    region: "北アメリカ",
  },
  {
    id: 10,
    latitude: 27.1751,
    longitude: 78.0421,
    name: "タージマハル",
    description: "インドのアーグラにある白い大理石の霊廟",
    imageUrl: "/locations/taj_mahal.jpg",
    region: "アジア",
  },
];

// データベースからランダムな場所を取得する
export function getRandomLocation(): Location {
  const randomIndex = Math.floor(Math.random() * locations.length);
  return locations[randomIndex];
}

// ゲーム用に複数のランダムな場所を取得する
export function getRandomLocations(count: number): Location[] {
  const shuffled = [...locations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// 地球上の2点間の距離を計算する（ハバーサイン公式）
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // 地球の半径（km）
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // 距離（km）
  return distance;
}

// 度をラジアンに変換する
function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// 距離に基づいてスコアを計算する（より近い = より高いスコア）
export function calculateScore(distanceKm: number): number {
  // 距離が0の場合は最大5000ポイント
  // 距離が10000km以上の場合は0ポイント
  const maxDistance = 10000; // km
  const maxScore = 5000;
  
  // 線形スコアリング：距離が増えるとスコアが減少する
  const score = Math.max(0, maxScore * (1 - distanceKm / maxDistance));
  return Math.round(score);
}
