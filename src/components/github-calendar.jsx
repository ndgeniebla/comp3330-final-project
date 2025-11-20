import Script from 'next/script'
 
export default function CalendarWidget() {
  return (
    <>
      <Script defer={true} src="https://cdn.jsdelivr.net/gh/imananoosheh/github-contributions-fetch@latest/github_calendar_widget.js" />
      <div id="calendar-component" username="ndgeniebla" theme-color="#000000" background-color="#fafafa"></div>
    </>
  )
}