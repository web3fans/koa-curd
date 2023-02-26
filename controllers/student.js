/*
 * @author: lth
 */
const StudentModel = require("../model/student");

class studentController {
  /**
   * 创建学生信息
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async create(ctx) {
    //接收客服端
    let req = ctx.request.body;
    if (req.name && req.age && req.gender && req.grade) {
      try {
        //创建学生信息模型
        const ret = await StudentModel.createStudent(req);
        //使用刚刚创建的学生信息ID查询学生信息详情，且返回学生信息详情信息
        const data = await StudentModel.getStudentDetail(ret.id);

        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: "创建学生信息成功",
          data,
        };
      } catch (err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: "创建学生信息失败",
          data: err,
        };
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 200,
        msg: "参数不齐全",
      };
    }
  }

  /**
   * 获取文章详情
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async detail(ctx) {
    let id = ctx.params.id;
    if (id) {
      try {
        // 查询学生信息详情模型
        let data = await StudentModel.getStudentDetail(id);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: "查询成功",
          data,
        };
      } catch (err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: "查询失败",
          data,
        };
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 416,
        msg: "学生ID必须传",
      };
    }
  }
}

module.exports = studentController;
