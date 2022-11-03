const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.bid.deleteMany();
        console.log("Bids removed.");

        await prisma.record.deleteMany();
        console.log("Records removed.");

        await prisma.user.deleteMany();
        console.log("Users removed.");

        await prisma.user.create({
            data: {
                name: 'johndoe',
                password: bcrypt.hashSync('superheslo', 8),
                email: 'johndoe@gmail.com',
                platformId: '130b942e-5b0b-43c7-8fa5-7e65b991756b'
            }
        })
        await prisma.user.create({
            data: {
                name: 'ponyslaystation',
                password: bcrypt.hashSync('superheslo', 8),
                email: 'ponyslaystation@gmail.com',
                platformId: '1ebd84f8-9f3c-4047-a2e9-cf8beaa75f2d'
            }
        })
        await prisma.user.create({
            data: {
                name: 'groot',
                password: bcrypt.hashSync('superheslo', 8),
                email: 'groot@gmail.com',
                platformId: '1ebd84f8-9f3c-4047-a2e9-cf8beaa75f2d'
            }
        })

        console.log('User created.');
    } catch (e) {
        console.log(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

load();