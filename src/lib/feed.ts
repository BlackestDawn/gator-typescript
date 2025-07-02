import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";


type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
  const response = await fetch(feedURL);
  const text = await response.text();
  const parser = new XMLParser();
  const feed = parser.parse(text);
  if (!feed.rss.channel) {
    throw new Error("Invalid RSS feed, channel not found");
  }

  const channel = feed.rss.channel;
  const feedTitle = channel.title;
  const feedLink = channel.link;
  const feedDescription = channel.description;
  if (!channel.item) {
    throw new Error("Invalid RSS feed, items not found");
  }
  if (!Array.isArray(channel.item)) {
    channel.item = [];
  }

  const items: RSSItem[] = [];
  for (const item of channel.item) {
    console.log("processing item:");
    console.log(item);

    const itemTitle = item.title;
    const itemLink = item.link;
    const itemDescription = item.description;
    const itemPubDate = item.pubDate;

    if (!itemTitle || !itemLink || !itemDescription || !itemPubDate) {
      continue
    }
    items.push({
      title: itemTitle,
      link: itemLink,
      description: itemDescription,
      pubDate: itemPubDate
    });
  }

  return {
    channel: {
      title: feedTitle,
      link: feedLink,
      description: feedDescription,
      item: items
    }
  };
}
