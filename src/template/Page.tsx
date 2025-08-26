import  Menu  from "./Menu"

type PageProps = {
    children: any
}

export const Page = (props: PageProps) => {
    return (
        <div className="flex">
            <Menu />
            <main className=" flex-1 p-7">{props.children}</main>
        </div>
    )
}