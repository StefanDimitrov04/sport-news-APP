const router = require('express').Router();
const newsManager = require('../managers/newsManager');
const News = require('../models/News');
const Comment = require('../models/Comment');

router.get('/home', async (req, res) => {
    try {
        const articles = await newsManager.getAll();
        res.json(articles);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.get('/latest-comments', async (req, res) => {
    try {
        const comments = await Comment.find()
                                     .sort({ createdAt: -1 })
                                     .limit(5)
                                     .populate("articleId")
                                     .populate("username");

        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:newsId', async (req, res) => {
    try {
        const news  = await newsManager.getOne(req.params.newsId);
        res.json(news);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/home/:sport', async (req, res) => {
    
    const sport = (req.params.sport);
    try {
        const result =  await News.find({sport});
        res.json(result);
    } catch (error) {
    res.status(500).json({message: error.message});
    }
})

router.post('/create', async (req,res) => {
    try {
        const newsData = await newsManager.create(req.body);
        res.json({messsage: "Article created succesfully", newsData});
    } catch (error) {
        res.status(400).json({message: error.message});
    }  
});

router.put('/:newsId/edit', async(req,res) => {
    try {
        const newsId = req.params.newsId;
        const newsData = req.body;
        const news = await newsManager.edit(newsId, newsData);
        res.status(200).json({message: "Film edited successfully!", news});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.delete('/:newsId/delete', async (req, res) => {
    const news = await newsManager.delete(req.params.newsId);

});


router.get('/:newsId/comments', async (req, res) => {
    const newsId = req.params.newsId;

    try {
        const comments = await Comment.find({ articleId: newsId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/:newsId/comment', async (req, res) => {
    const { userId, username, commentText } = req.body;
    const newsId = req.params.newsId;

    try {
        const comment = new Comment({ userId, username, commentText, articleId: newsId });
        await comment.save();

        const article = await News.findById(newsId);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        article.comments.push({ username, commentText });
        await article.save();

        res.status(200).json({ message: "Comment added successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;
