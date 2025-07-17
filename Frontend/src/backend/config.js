
import conf from '../conf/conf'


class Config {
    axios;
    constructor() {
        this.axios = conf
    }

    async job_application() {


        try {
            const response = await this.axios.post('/job-application')
            return response.data;

        } catch (error) {
            console.error('Error creating job application:', error);
            throw error;
        }
    }

    async jobs() {
        try {
            const response = await this.axios.get('/jobs')
            return response.data;

        } catch (error) {
            console.error('Error fetching jobs:', error);
            throw error;
        }
    }



    async job_details(jobId) {
        try {
            const response = await this.axios.get(`/jobs/${jobId}`)
            return response.data;

        } catch (error) {
            console.error('Error fetching job details:', error);
            throw error;
        }
    }

    async job_application() {
        try {
            const response = await this.axios.get('/job-application')
            return response.data;

        } catch (error) {
            console.error('Error fetching job applications:', error);
            throw error;
        }
    }

}

const config = new Config()

export default config
