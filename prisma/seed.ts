import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const manufacturerData = [
    {
        name: 'Target',
    },
    {
        name: 'Dynasty',
    },
    {
        name: 'Trinidad',
    },
]

const playerData = [
    {
        name: 'Haruki Muramatsu',
    },
    {
        name: 'Mikuru Suzuki',
    },
    {
        name: 'Yuki Yamada',
    },
]

const seriesData = [
    {
        name: 'Rising Sun',
    },
    {
        name: 'Miracle',
    },
    {
        name: 'Gomez',
    },
]

async function main() {
    const manufacturers = await Promise.all(
        manufacturerData.map(async (manufacturer: any) => {
            const createdManufacturer = await prisma.manufacturer.create({
                data: manufacturer,
            })
            return createdManufacturer
        }
    ))
    console.log({manufacturers})

    const players = await Promise.all(
        playerData.map(async (player: any) => {
            const createdPlayer = await prisma.player.create({
                data: player,
            })
            return createdPlayer
        }
    ))
    console.log({players})

    const series = await Promise.all(
        seriesData.map(async (series: any) => {
            const createdSeries = await prisma.series.create({
                data: series,
            })
            return createdSeries
        }
    ))
    console.log({series})

    const barrelData = [
        {
            name: 'Haruki Muramatsu Rising Sun',
            manufacturer: {
                connect: {
                    id: manufacturers[0].id,
                },
            },
            maxDiameter: 7.8,
            length: 42.5,
            weight: 22,
            signaturePlayer: {
                connect: {
                    id: players[0].id,
                },
            },
            series: {
                connect: {
                    id: series[0].id,
                },
            },
        },
    ]

    const barrels = await Promise.all(
        barrelData.map(async (barrel: any) => {
            const createdBarrel = await prisma.barrel.create({
                data: barrel,
            })
            return createdBarrel
        }
    ))
    console.log({barrels})
}

main()
    .catch((e) => {
        throw e
    }
    )
    .finally(async () => {
        await prisma.$disconnect()
    }
    )
