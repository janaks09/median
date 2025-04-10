import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds support for MongoDB' },
    update: {},
    create: {
      title: 'Prisma Adds support for MongoDB',
      content:
        'Prisma is a next-generation ORM that can be used to query databases in Node.js and TypeScript applications. It has been around for a while, but it has recently added support for MongoDB, which is a popular NoSQL database.',
      description:
        'Prisma is a next-generation ORM that can be used to query databases in Node.js and TypeScript applications. It has been around for a while, but it has recently added support for MongoDB, which is a popular NoSQL database.',
      published: false,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      content:
        'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
    },
  });

  console.log({ post1, post2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect().catch((err) => {
      console.error('Error disconnecting Prisma:', err);
    });
  });
