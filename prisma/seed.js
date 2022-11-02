const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.record.deleteMany();
        console.log("Records removed.");

        await prisma.user.deleteMany();
        console.log("Users removed.");

        await prisma.user.create({
            data: {
                name: 'johndoe',
                password: bcrypt.hashSync('password', 8),
                email: 'johndoe@drazba.eu'
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