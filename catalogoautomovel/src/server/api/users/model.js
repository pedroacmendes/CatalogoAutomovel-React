const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const SALT_WORK_FACTOR = 10
const { Schema } = mongoose

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	updated: {
		type: Date,
		default: Date.now
	},
	username: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		default: ''
	}
})

userSchema.pre('save', function (next) {
	let user = this
	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) {
		return next()
	}

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) {
			return next(err)
		}

		// hash the password using our new salt
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) {
				return next(err)
			}

			// override the cleartext password with the hashed one
			user.password = hash
			next()
		})
	})
})
userSchema.pre('findOneAndUpdate', function(next) {
	if (this.getUpdate().password) {
		this.update({}, { password: bcrypt.hashSync(this.getUpdate().password, SALT_WORK_FACTOR) } )
	}
	next()
})
userSchema.set('toJSON', {
	getters: true,
	transform: (_, ret) => {
		return {
			...ret,
			password: undefined
		}
	}
})

module.exports = mongoose.model('User', userSchema)