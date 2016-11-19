// This adapter helps to use next-gen poll components
// inside Ficus presenter. It basically transforms
// props to the appropriate format.
const FicusPollAdapter = (Component) =>
  (props) => {
    const results = props.results || {}
    const config = props.config || {}
    const votesByChoice = results.results || {}
    const votersCount = results.votersCount || 0
    const extResults = {}

    const configPoll = config.poll || []

    configPoll.forEach(p => {
      extResults[p.id] = {
        votes: votesByChoice[p.id],
        percent: (votersCount ? votesByChoice[p.id] / votersCount : 0.0)
      }
    })

    // Ficus presenter doesn't let use see the vote
    // of a specific user, but instead gives you a whole
    // poll summary
    const voters = []

    const poll = {
      title: config.title,
      url: props.url,

      choices: configPoll.map(p => ({
        id: p.id,
        color: p.color,
        text: p.text
      })),

      voters: voters,

      votersCount: votersCount,
      results: extResults
    }

    return <Component {...props} poll={poll} />
  }

export default FicusPollAdapter
