import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client";
import convertHourStringToMinutes from "./utils/convert_hour_string_to_minutes";
import convertMinutesToHourString from "./utils/convert_minutes_to_hour_string";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const prisma = new PrismaClient({ log: ["query"] });

app.get("/games", async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })

    return res.json(games)
})

app.post("/games/:id/ads", async (req, res) => {
    const gameId = req.params.id;
    const body = req.body;


    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(","),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return res.status(201).json(ad)
})

app.get("/games/:id/ads", async (req, res) => {
    const gameId = req.params.id

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: "desc",
        }
    })

    return res.json(ads.map((ad: { weekDays: string; hourStart: number; hourEnd: number; }) => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),
        }
    }))
})

app.get("/ads/:id/discord", async (req, res) => {
    const adId = req.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    })

    return res.json({
        discord: ad.discord
    })
})


app.listen(3333);


