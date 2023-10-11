import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import Ffmpeg from 'fluent-ffmpeg';
Ffmpeg.setFfmpegPath(ffmpegPath.path);
import fs from 'fs';
import { Op } from 'sequelize';
import Reel from '../models/Reel.js';

export default class ReelService {

    // CREATE

    async createVideo(params, video) {
        try {
            const data = {
                ...params,
                filename: video.filename,
                path: `/video/reels/${video.filename}`,
                active: false
            };

            const res = await Reel.create(data);

            return res;
        } catch(err) {
            console.log('Save Reel Video To Server Error: ', err);
            throw Error('There was an error creating the reel video');
        }
    }

    async createYoutubeReel(params) {
        try {
            const data = {
                ...params,
                active: false
            };

            const res = await Reel.create(data);

            return res;
        } catch(err) {
            console.log('Save Youtube Reel To Server Error: ', err);
            throw Error('There was an error creating the youtube reel');
        }
    }

    // READ

    async getReels() {
        try {
            const res = await Reel.findAndCountAll();
            return res;
        } catch (err) {
            console.log('Get Reels Error: ', err);
            throw Error('There was an error getting all reels');
        }
    }

    async getVideoReels() {
        try {
            const res = await Reel.findAndCountAll({
                where: {
                    reelType: 'video'
                }
            });
            return res;
        } catch (err) {
            console.log('Get Video Reels Error: ', err);
            throw Error('There was an error getting all video reels');
        }
    }

    async getReelById(id) {
        try {
            const res = await Reel.findOne(
                {
                    where: {
                        id:id
                    }
                }
            );
            return res;
        } catch (err) {
            console.log('Get Reel By Id Error: ', err);
            throw Error('There was an error getting the reel by id');
        }
    }

    async streamVideoById(res, id) {
        const getVideoById = await Reel.findAndCountAll(
            {
                where: {
                    id:id
                }
            }
        );

        const videoFilename = getVideoById.rows[0].filename;
        const path = `./public/video/reels/${videoFilename}`;

        const stat = fs.statSync(path)
        const fileSize = stat.size
        const range = req.headers.range
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1
            const chunksize = (end - start) + 1
            const file = fs.createReadStream(path, { start, end })
            const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
            }
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
            }
            res.writeHead(200, head)
            fs.createReadStream(path).pipe(res)
        }
    }

    // UPDATE 

    async activateReel(id) {
        try {
            const getReel = await Reel.findOne(
                {
                    where: {
                        id:id
                    }
                }
            );

            const res = await Reel.update(
                {
                    active: !getReel.dataValues.active
                },
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('UPDATE Youtube Reel Error: ', err);
            throw Error('There was an error updating the Youtube Reel');
        }
    }

    async updateYoutubeReel(id, params) {
        try {
            const res = await Reel.update(
                params,
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('UPDATE Youtube Reel Error: ', err);
            throw Error('There was an error updating the Youtube Reel');
        }
    }

    // DELETE

    async deleteReelById(id) {
        try {
            const getReel = await Reel.findAndCountAll({
                where: {
                    id
                }
            });
            
            if(getReel.rows[0].path) {
                const videoPath = getReel.rows[0].path;

                fs.stat(`./public${videoPath}`, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                
                    fs.unlink(`./public${videoPath}`,function(err){
                        if(err) return console.log('There was an error deleting the Reel: ', err);
                        console.log('file deleted successfully');
                    });
                });
            }

            const res = await Reel.destroy(
                {
                    where: {
                                id: id
                            }
                }
            );
            return {
                status: 200,
                res: res
            };
        } catch (err) {
            console.log('DELETE Reel Error: ', err);
            throw Error('There was an error deleting the Reel');
        }
    }
}