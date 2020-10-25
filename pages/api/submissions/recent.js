import { SendJsonResponse } from '../../../src/utils/http'

export default (_req, res) => {
  // let recent_submissions = await Submission.find().sort({ created_at: -1 }).limit(6)
  SendJsonResponse(
    res,
    [
      { slug: 'DOG', expression: 'DOG' },
      { slug: 'CAT', expression: 'CAT' },
      { slug: 'GOA', expression: 'GOA' }
    ]
  )
}
