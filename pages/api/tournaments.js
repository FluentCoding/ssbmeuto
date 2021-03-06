import dbConnect from '../../utils/dbConnect'
import Tournament from '../../models/Tournament'
import { twoDigitFix, CETDate } from '../../global/Global'

const tournaments = [
    [],
    [{name: "We will update this all soon! Example tournament:", challonge:"https://challonge.com/de/pwxhs9s0", time: "8 PM CET"}],
    [],
    [],
    [{name: "LEVO 2", discord: "https://discord.gg/gN5ve7H", smashgg: "https://smash.gg/tournament/levo-eu-2", time: "5 PM CET"}],
    [{name: "LEVO 1", discord: "https://discord.gg/gN5ve7H", smashgg: "https://smash.gg/tournament/levo-eu-1", time: "5 PM CET"}],
    []
];

export default async(req, res) => {
    await dbConnect();

    try {
        await Tournament.deleteMany({state: {$lt: 2}, datetime: {$lt: new Date().getTime() - (1000 * 60 * 60 * 24 * 7)}})

        var start = CETDate();
        start.setHours(0, 0, 0, 0);
        var end = new Date(start);
        end.setDate(end.getDate() + 7);

        const yourTournaments = await Tournament.find({state: 2, datetime: {$gte: start.getTime(), $lt: end.getTime()}});
        yourTournaments.sort((a, b) => a.name < b.name ? 1 : -1);
        yourTournaments.sort((a, b) => a.datetime > b.datetime ? 1 : -1);
        const result = [[], [], [], [], [], [], []];
        var i = new Date(start);
        result.forEach(holder => {
            var i2 = new Date(i);
            i2.setDate(i.getDate() + 1);

            yourTournaments.forEach(tournament => {
                if (tournament.datetime >= i.getTime() && tournament.datetime < i2.getTime()) {
                    var d = new Date(tournament.datetime);
                    d.setUTCHours(d.getUTCHours() + 1);
                    var toPush = {name: tournament.name, time: twoDigitFix(d.getUTCHours()) + ":" + twoDigitFix(d.getMinutes()) + " CET"};
                    if (tournament.discord) {
                        toPush["discord"] = tournament.discord;
                    }
                    if (tournament.challonge) {
                        toPush["challonge"] = tournament.challonge;
                    }
                    if (tournament.smashgg) {
                        toPush["smashgg"] = tournament.smashgg;
                    }

                    holder.push(toPush);
                }
            });

            i = i2;
        });
        res.status(201).json({data: result})
    } catch(error) {
        console.log(error);
        res.status(400).json({success: false})
    }
}