import { config } from 'dotenv'
import path from 'path'

config({ path: path.join(process.cwd(), '.env') })

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DB_URI,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
}
