import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: {},
    create: {
      email: 'sabin@adams.com',
      name: 'Sabin Adams',
      password: 'password-sabin',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'John Doe',
      password: 'password-john',
    },
  });

  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds support for MongoDB' },
    update: {
      authorId: user1.id,
    },
    create: {
      title: 'Prisma Adds support for MongoDB',
      content:
        'Prisma is a next-generation ORM that can be used to query databases in Node.js and TypeScript applications. It has been around for a while, but it has recently added support for MongoDB, which is a popular NoSQL database.',
      description:
        'Prisma is a next-generation ORM that can be used to query databases in Node.js and TypeScript applications. It has been around for a while, but it has recently added support for MongoDB, which is a popular NoSQL database.',
      published: false,
      authorId: user1.id,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {
      authorId: user2.id,
    },
    create: {
      title: "What's new in Prisma? (Q1/22)",
      content:
        'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
      authorId: user2.id,
    },
  });

  const post3 = await prisma.article.upsert({
    where: { title: 'Prisma Client Just Became a Lot More Flexible' },
    update: {},
    create: {
      title: 'Prisma Client Just Became a Lot More Flexible',
      content:
        'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
      description:
        'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client..',
      published: true,
    },
  });

  console.log({ user1, user2, post1, post2, post3 });
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
