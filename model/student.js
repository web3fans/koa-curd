/*
 * @author: lth
 */
//实体模型;
// 引入mysql的配置文件
const db = require("../config/db");

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
//seSequelize 5.x
const student = Sequelize.import("../schema/student");
//seSequelize 6.x
// const student = require("../schema/student")(Sequelize, Sequelize.DataTypes);
student.sync({ force: false }); //自动创建表

class studentModel {
  /**
   * 创建学生表模型
   * @param data
   * @returns {Promise<*>}
   */
  static async createStudent(data) {
    return await student.create({
      name: data.name, //姓名
      age: data.age, //年龄
      gender: data.gender, //性别
      grade: data.grade, //分数
    });
  }

  /**
   * 查询学生信息的详情
   * @param id 学生信息ID
   * @returns {Promise<Model>}
   */
  static async getStudentDetail(id) {
    return await student.findOne({
      where: {
        id,
      },
    });
  }
}

module.exports = studentModel;
