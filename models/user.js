module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {  
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dob: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        profilePicture: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM('Male', 'Female', 'Other'),
            allowNull: true
        }
    });
    return user
};

