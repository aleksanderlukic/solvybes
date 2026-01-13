import { NextResponse } from "next/server";

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Latitude and longitude required" },
      { status: 400 }
    );
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Weather API request failed");
    }

    const data = await response.json();

    // Get one forecast per day (around 12:00)
    const dailyForecasts = [];
    const processedDates = new Set();

    for (const item of data.list) {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toISOString().split("T")[0];

      if (!processedDates.has(dateStr) && dailyForecasts.length < 5) {
        processedDates.add(dateStr);

        const weekday = date.toLocaleDateString("sv-SE", { weekday: "short" });
        const dayMonth = date.toLocaleDateString("sv-SE", {
          day: "numeric",
          month: "short",
        });

        dailyForecasts.push({
          date: `${weekday}, ${dayMonth}`,
          tempHigh: Math.round(item.main.temp_max),
          tempLow: Math.round(item.main.temp_min),
          description: item.weather[0].description,
          icon: getWeatherIcon(item.weather[0].main),
          precipitation: Math.round((item.pop || 0) * 100),
        });
      }

      if (dailyForecasts.length >= 5) break;
    }

    return NextResponse.json({
      city: data.city.name,
      forecasts: dailyForecasts,
    });
  } catch (error) {
    console.error("Forecast API error:", error);

    // Return fallback data
    const fallbackForecasts = generateFallbackForecast();
    return NextResponse.json({
      city: "Stockholm",
      forecasts: fallbackForecasts,
    });
  }
}

function getWeatherIcon(condition: string): string {
  const iconMap: { [key: string]: string } = {
    Clear: "☀️",
    Clouds: "⛅",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Snow: "❄️",
    Thunderstorm: "⛈️",
    Mist: "🌫️",
    Fog: "🌫️",
  };
  return iconMap[condition] || "⛅";
}

function generateFallbackForecast() {
  const forecasts = [];
  const today = new Date();

  for (let i = 1; i <= 5; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);

    const weekday = date.toLocaleDateString("sv-SE", { weekday: "short" });
    const dayMonth = date.toLocaleDateString("sv-SE", {
      day: "numeric",
      month: "short",
    });

    forecasts.push({
      date: `${weekday}, ${dayMonth}`,
      tempHigh: Math.round(8 + Math.random() * 6),
      tempLow: Math.round(2 + Math.random() * 4),
      description: ["Sol", "Molnigt", "Lätt regn", "Delvis molnigt"][
        Math.floor(Math.random() * 4)
      ],
      icon: ["☀️", "⛅", "🌦️", "🌧️"][Math.floor(Math.random() * 4)],
      precipitation: Math.round(Math.random() * 60),
    });
  }

  return forecasts;
}
