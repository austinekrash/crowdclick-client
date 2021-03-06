import React from 'react'
import { useParams } from 'react-router-dom'
import { TASK_ENDPOINT } from '../../config/api-config'
import { useFetch } from '../../hooks/useFetch'
import  LoadingIcon  from '../../shared/components/loadingIcons/LoadingIcon'
import  PublisherWizardFormCampaignContainer  from '../publisher-dashboard__new-task/containers'


const EditPublisherWizardFormCampaignContainer = ({drizzle, drizzleState}) => {
  const { id } = useParams()
  const resp = useFetch(`${TASK_ENDPOINT}${id}/`)

  if (!resp.response) {
    return <LoadingIcon />
  } else {
    const optionsArr = resp.response.data.questions[0].options.map(x => {return {option: x.title}})
    const initial_values = {
      projectName: resp.response.data.title,
      projectDescription: resp.response.data.description,
      projectURL: resp.response.data.website_link,
      pricePerClick: resp.response.data.reward_per_click,
      campaignBudget: resp.response.data.spend_daily,
      projectQuestion: resp.response.data.questions[0].title,
      projectOptions: optionsArr
    //   projectOptions: resp.response.data.questions[0].options
    }
    return <PublisherWizardFormCampaignContainer initial_values={initial_values} edit={true} id={id} drizzle={drizzle} drizzleState={drizzleState} />
  }
}

export default EditPublisherWizardFormCampaignContainer