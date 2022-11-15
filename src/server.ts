import { app } from "./app";
import { prisma } from "./prisma/client";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  await prisma.$connect();

  app.listen(PORT, () =>
    console.log(`App running at http://localhost:${PORT}`)
  );
}

bootstrap();
