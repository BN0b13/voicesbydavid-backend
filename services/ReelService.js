import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Category, Reel } from '../models/Associations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class ReelService {

    // CREATE

    async createAudioReel(params, audio) {
        try {
            const data = {
                ...params,
                filename: audio.filename,
                path: `/audio/reels/${audio.filename}`,
                active: false
            };

            const res = await Reel.create(data);

            return res;
        } catch(err) {
            console.log('Save Reel Audio To Server Error: ', err);
            throw Error('There was an error creating the reel audio');
        }
    }

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
            const res = await Reel.findAndCountAll({
                include: [
                    { 
                        model: Category
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('Get Reels Error: ', err);
            throw Error('There was an error getting all reels');
        }
    }

    async getReelById(id) {
        try {
            const res = await Reel.findOne({
                where: {
                    id
                },
                include: [
                    { 
                        model: Category
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('Get Reel by id Error: ', err);
            throw Error('There was an error getting reel by id');
        }
    }

    async getAudioReelByFilename(req, res) {
        try {
            const { filename } = req.params;

            const filePath = path.join(__dirname, '../public/audio/reels/', filename);

            fs.stat(filePath, (err, stats) => {
                if (err || !stats.isFile()) {
                    return res.status(404).send('File not found');
                }

                const range = req.headers.range;
                if (range) {
                    // Handle range requests (partial content for seeking)
                    const [start, end] = range.replace(/bytes=/, "").split("-");
                    const startByte = parseInt(start, 10);
                    const endByte = end ? parseInt(end, 10) : stats.size - 1;
                    const chunkSize = endByte - startByte + 1;

                    res.writeHead(206, {
                        'Content-Range': `bytes ${startByte}-${endByte}/${stats.size}`,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': chunkSize,
                        'Content-Type': 'audio/mp4',
                    });

                    return fs.createReadStream(filePath, { start: startByte, end: endByte }).pipe(res);
                }

                // If no range request, serve the full file
                res.writeHead(200, {
                    'Content-Type': 'audio/mp4',
                    'Content-Length': stats.size,
                });

                fs.createReadStream(filePath).pipe(res);
            });

        } catch (err) {
            console.error('Get Audio Reel Error:', err);
            res.status(500).json({ error: 'There was an error retrieving the audio reel' });
        }
    }

    async getVideoReelByFilename(req, res) {
        try {
            const { filename } = req.params;

            const filePath = path.join(__dirname, '../public/video/reels/', filename);


            fs.stat(filePath, (err, stats) => {
                if (err || !stats.isFile()) {
                    return res.status(404).send('File not found');
                }

                const range = req.headers.range;
                if (range) {
                    const [start, end] = range.replace(/bytes=/, "").split("-");
                    const startByte = parseInt(start, 10);
                    const endByte = end ? parseInt(end, 10) : stats.size - 1;
                    const chunkSize = endByte - startByte + 1;

                    res.writeHead(206, {
                        'Content-Range': `bytes ${startByte}-${endByte}/${stats.size}`,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': chunkSize,
                        'Content-Type': 'video/mp4',
                    });

                    return fs.createReadStream(filePath, { start: startByte, end: endByte }).pipe(res);
                }

                // If no range request, serve the full file
                res.writeHead(200, {
                    'Content-Type': 'video/mp4',
                    'Content-Length': stats.size,
                });

                fs.createReadStream(filePath).pipe(res);
            });

        } catch (err) {
            console.error('Get Video Error:', err);
            res.status(500).json({ error: 'There was an error retrieving the video' });
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

    async updateReel(id, params) {
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
            console.log('UPDATE Reel Error: ', err);
            throw Error('There was an error updating the Reel');
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