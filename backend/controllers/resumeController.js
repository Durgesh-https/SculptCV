import Resume from "../models/resumeModel.js";
import fs from "fs";
import path from "path";

export const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        // Default template.
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };

        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
            ...req.body
        })
        res.status(201).json(newResume)
    } catch (error) {
        console.error("Error from resumeController :", error.message);
        res.status(500).json({ success: false, message: "Failed to create Resume", error: error.message });
    }
};

export const getUserResume = async (req, res) => {
    try {
        const resume = await Resume.find({ userId: req.user._id }).sort({
            updatedAt: -1
        });
        res.json(resume);
    } catch (error) {
        console.error("Error from resumeController :", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch Resume", error: error.message });
    }
}

export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });

        if(!resume) {
            return res.status(404).json({ success: false, message: "Resume not found." });
        }
        res.json(resume);
    } catch (error) {
        console.error("Error from resumeController :", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch Resume", error: error.message });
    }    
};

export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });

        if(!resume) {
            return res.status(404).json({ success: false, message: "Resume not found or not authorized." });
        }
        // Merge updated resume
        const allowedUpdates = { ...req.body };
        delete allowedUpdates.userId;

        Object.assign(resume, allowedUpdates); // it will information to existing resume, if info want to change.

        // Object.assign(resume, req.body); // it will information to existing resume, if info want to change.

        //save updated resume
        const saveResume = await resume.save();
        res.json(saveResume);
    } catch (error) {
        console.error("Error from resumeController :", error.message);
        res.status(500).json({ success: false, message: "Failed to update Resume", error: error.message });
    }
};

export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
        if(!resume) {
            return res.status(404).json({ success: false, message: "Resume not found or not authorized." });
        }
        // Create a uploads folder and store the resume there.
        const uploadsFolder = path.join(process.cwd(), 'uploads');

        // Delete thumbnail function.
        if(resume.thumbnailLink) {
            const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
            if(fs.existsSync(oldThumbnail)) {
                fs.unlinkSync(oldThumbnail);
            }
        }

        if(resume.profileInfo?.profilePreviewUrl) {
            const oldProfile = path.join(
                uploadsFolder,
                path.basename(resume.profileInfo.profilePreviewUrl)
            )
            if(fs.existsSync(oldProfile)) {
                fs.unlinkSync(oldProfile);
            }
        }

        // Delete resume document
        const deleted = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if(!deleted) {
            return res.status(404).json({ success: false, message: "Resume is not found or not authorized." });
        }
        res.json({ success: true, message: "Resume deleted successfully." });
    } catch (error) {
        console.error("Error from resumeController :", error.message);
        res.status(500).json({ success: false, message: "Failed to delete Resume", error: error.message });
    }
};