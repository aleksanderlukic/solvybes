import Link from "next/link";
import VideoCard from "@/components/VideoCard";
import styles from "./page.module.scss";

export default function HomePage() {
  // Daily quotes that rotate each day
  const dailyQuotes = [
    {
      text: "The sun does not shine for a few trees and flowers, but for the wide world's joy.",
      author: "Henry Ward Beecher",
    },
    {
      text: "Keep your face always toward the sunshine—and shadows will fall behind you.",
      author: "Walt Whitman",
    },
    {
      text: "Summer afternoon—summer afternoon; to me those have always been the two most beautiful words in the English language.",
      author: "Henry James",
    },
    {
      text: "In the depth of winter, I finally learned that within me there lay an invincible summer.",
      author: "Albert Camus",
    },
    {
      text: "Everything good, everything magical happens between the months of June and August.",
      author: "Jenny Han",
    },
    {
      text: "And so with the sunshine and the great bursts of leaves growing on the trees, just as things grow in fast movies, I had that familiar conviction that life was beginning over again with the summer.",
      author: "F. Scott Fitzgerald",
    },
    {
      text: "Live in the sunshine, swim the sea, drink the wild air.",
      author: "Ralph Waldo Emerson",
    },
    {
      text: "Summer is a state of mind.",
      author: "Unknown",
    },
    {
      text: "Smell the sea and feel the sky. Let your soul and spirit fly.",
      author: "Van Morrison",
    },
    {
      text: "To plant a garden is to believe in tomorrow.",
      author: "Audrey Hepburn",
    },
    {
      text: "The tans will fade, but the memories will last forever.",
      author: "Unknown",
    },
    {
      text: "Summertime is always the best of what might be.",
      author: "Charles Bowden",
    },
    {
      text: "A life without love is like a year without summer.",
      author: "Swedish Proverb",
    },
    {
      text: "Deep summer is when laziness finds respectability.",
      author: "Sam Keen",
    },
    {
      text: "If it could only be like this always – always summer, always alone, the fruit always ripe.",
      author: "Evelyn Waugh",
    },
    {
      text: "One must maintain a little bit of summer, even in the middle of winter.",
      author: "Henry David Thoreau",
    },
    {
      text: "Some of the best memories are made in flip flops.",
      author: "Kellie Elmore",
    },
    {
      text: "Sun is shining. Weather is sweet. Make you wanna move your dancing feet.",
      author: "Bob Marley",
    },
    {
      text: "A perfect summer day is when the sun is shining, the breeze is blowing, the birds are singing, and the lawn mower is broken.",
      author: "James Dent",
    },
    {
      text: "Summertime. It was a song. It was a season. I wondered if that season would ever live inside of me.",
      author: "Benjamin Alire Sáenz",
    },
    {
      text: "Summer is the time when one sheds one's tensions with one's clothes, and the right kind of day is jeweled balm for the battered spirit.",
      author: "Ada Louise Huxtable",
    },
    {
      text: "Rest is not idleness, and to lie sometimes on the grass under trees on a summer's day, listening to the murmur of the water, or watching the clouds float across the sky, is by no means a waste of time.",
      author: "John Lubbock",
    },
    {
      text: "Summer means happy times and good sunshine. It means going to the beach, going to Disneyland, having fun.",
      author: "Brian Wilson",
    },
    {
      text: "Let life be beautiful like summer flowers and death like autumn leaves.",
      author: "Rabindranath Tagore",
    },
    {
      text: "In summer, the song sings itself.",
      author: "William Carlos Williams",
    },
    {
      text: "The summer night is like a perfection of thought.",
      author: "Wallace Stevens",
    },
    {
      text: "Vacation: a period of travel and relaxation when you take twice the clothes and half the money you need.",
      author: "Unknown",
    },
    {
      text: "Summer is the annual permission slip to be lazy. To do nothing and have it count for something. To lie in the grass and count the stars. To sit on a branch and study the clouds.",
      author: "Regina Brett",
    },
    {
      text: "A vacation is having nothing to do and all day to do it in.",
      author: "Robert Orben",
    },
    {
      text: "It's summertime and the living is easy.",
      author: "George Gershwin",
    },
  ];

  // Get quote based on day of year (same quote all day, changes at midnight)
  const getDailyQuote = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const quoteIndex = dayOfYear % dailyQuotes.length;
    return dailyQuotes[quoteIndex];
  };

  const todaysQuote = getDailyQuote();

  const trendingVideos = [
    {
      id: "1",
      title: "Sunset Beach Walk",
      country: "Spain",
      type: "Beach" as const,
      timeOfDay: "Day" as const,
    },
    {
      id: "2",
      title: "Mediterranean Coast",
      country: "Greece",
      type: "Beach" as const,
      timeOfDay: "Day" as const,
    },
    {
      id: "3",
      title: "Barcelona Streets",
      country: "Spain",
      type: "City" as const,
      timeOfDay: "Day" as const,
    },
  ];

  const daysUntilSummer = Math.ceil(
    (new Date("2026-06-21").getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Fly vintern.
          <br />
          Känn solen.
        </h1>
        <p className={styles.subtitle}>
          Escape to summer. Feel the warmth, calm your mind, find your peace.
        </p>

        <div className={styles.buttons}>
          <Link href="/videos" className={styles.btnPrimary}>
            Starta en random video
          </Link>
          <Link href="/explore" className={styles.btnSecondary}>
            Välj land
          </Link>
        </div>

        <div className={styles.filters}>
          <button className={styles.chip}>🏖️ Beach</button>
          <button className={styles.chip}>🏙️ City</button>
          <button className={styles.chip}>☀️ Day</button>
          <button className={styles.chip}>🌙 Night</button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Trending Videos</h2>
        <div className={styles.videoGrid}>
          {trendingVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Dagens Quote</h2>
          <blockquote className={styles.quote}>
            &ldquo;{todaysQuote.text}&rdquo;
          </blockquote>
          <p className={styles.quoteAuthor}>— {todaysQuote.author}</p>
        </div>
      </section>

      <section className={styles.section}>
        <Link href="/countdown">
          <div className={styles.countdownCard}>
            <h2 className={styles.countdownTitle}>🌞 Sommarnedräkning</h2>
            <p className={styles.countdownNumber}>{daysUntilSummer} dagar</p>
            <p className={styles.countdownLabel}>kvar till sommaren</p>
          </div>
        </Link>
      </section>
    </div>
  );
}
