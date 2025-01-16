interface TabContainerProps {
  children: React.ReactNode
}

const TabContainer = ({children}: TabContainerProps) => {
  return (
    <div className="flex justify-center mt-10 border-b-[3px] border-[#e2e8ea]">
      <div className="flex justify-between">
        { children }
      </div>
    </div>
  )
}

export default TabContainer