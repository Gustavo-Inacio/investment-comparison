interface PageHeaderProps {
  title: string;
  text?: string;
}

export const PageHeader = ({ title, text }: PageHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="font-extrabold text-lg lg:text-4xl">{title}</h1>
      {text && <p className="text-gray-600 w-135.5 max-w-[80vw] wrap-normal">{text}</p>}
    </div>
  )
}