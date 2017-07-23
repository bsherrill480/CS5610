var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs5610_webdev');
mongoose.Promise = require('q').Promise;

var blogPostSchema = mongoose.Schema({
    title: String,
    body: String,
    postDate: {type: Date, default: Date.now},
    thumbsUp: {type: Number, default: 0}

}, {collection: 'blogpost'});

var blogModel = mongoose.model("BlogPost", blogPostSchema);



deleteBlogPost("5971d8649d68340db16d33b0")
    .then(function (status) {
        console.log(status)
        return findAllBlogPost()
    })
    .then(function (blogPost) {
        console.log(blogPost);
    })


function deleteBlogPost(postId) {
    return blogModel.remove({_id: postId})
}

function updateBlogPost(postId, newPost) {
    return blogModel
            .update({_id: postId}, {
                $set:{
                    title: newPost.title,
                    body: newPost.body,
                    thumbsUp: newPost.thumbsUp
                }
            })
}

function findBlogPostByTitle(title) {
    return blogModel.find({title: title});
}

function findBlogPostById(postId) {
    return blogModel.findOne({_id: postId});//findOne: object but not array
    //return blogModel.findById(postId);//sugar
}

function findAllBlogPost() {
    return blogModel.find();
}

function createBlogPost(blogPost) {
    blogModel
        .create(blogPost);
}

//createBlogPost({title: "post 678", body: "body 678"})
//         .then(function (doc) {
//             console.log(doc);
//         }, function (err) {
//             console.log(err);
//         });

// findAllBlogPost()
//     .then(function (posts) {
//         console.log(posts)
//     });


//
// findBlogPostById("5971dc8dc901720e5dd16823")
//     .then(function (blogPost) {
//         console.log(blogPost);
//     })

//
// findBlogPostByTitle("post 456")
//     .then(function (doc) {
//         console.log(doc);
//     }, function (err) {
//         console.log(err);
//     });


//updateBlogPost("5971d7ca368a130d6f618303", {
//     body: "body 456 updated version",
//     thumbsUp: 666
// })
//     .then(function (status) {
//         return findBlogPostById("5971d7ca368a130d6f618303")
//     }, function (err) {
//         console.log(err);
//     })
//     .then(function (blogPost) {
//         console.log(blogPost);
//     });