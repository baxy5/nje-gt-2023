import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;

  if (data.points <= 25 && data.bonusPoints <= 5) {
    await prisma.csapat.update({
      where: {
        id: data.id,
      },
      data: {
        points: { increment: data.points + data.bonusPoints },
        description: {
          set: data.prevDesc + data.desc,
        },
      },
    });
  }

  res.status(200).json({ message: data });
}
