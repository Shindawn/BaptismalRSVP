const { PrismaClient } = require('@prisma/client');

async function main() {
  const db = new PrismaClient();
  try {
    const rows = await db.rsvp.findMany();
    console.log('RSVP rows:', rows);
  } catch (e) {
    console.error('Error querying Rsvp:', e);
    process.exitCode = 1;
  } finally {
    await db.$disconnect();
  }
}

main();
