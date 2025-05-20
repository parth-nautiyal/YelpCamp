const Campground = require('../models/campground')

module.exports.index= async (req, res) => {
    const camps = await Campground.find({})
    res.render('campgrounds/home.ejs', { camps })
    }
module.exports.newCampForm = (req, res) => {
    res.render('campgrounds/new.ejs')
}
module.exports.viewCamp = async (req, res) => {
    const camp = await Campground.findById(req.params.id).populate(
        {
            path:'review',
            populate:{
                path: 'author'
            }
        }
    ).populate('author');
    if(!camp)
    {
        req.flash('error','Campground does not exists')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show.ejs', { camp })
}
module.exports.editCamp = async (req, res) => {
    const camp = await Campground.findById(req.params.id)
    if(!camp)
        {
            req.flash('error','Campground not found')
            return res.redirect('/campgrounds');
        }
    res.render('campgrounds/edit.ejs', { camp })
}
module.exports.updateCamp= async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success','Successfully updated Campground')
    res.redirect(`/campgrounds/${camp._id}`)
}
module.exports.renderCampForm = async (req, res) => {
    const camp = new Campground(req.body.campground)
    camp.author = req.user._id;
    await camp.save()
    req.flash('success','Successfully made a new Campground')
    res.redirect(`/campgrounds/${camp._id}`)
}
module.exports.deleteCamp = async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id);
    req.flash('success','Successfully deleted Campground')
    res.redirect('/campgrounds');
}