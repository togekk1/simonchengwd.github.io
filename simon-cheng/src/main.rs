use yew_services::{ConsoleService};
use yew_functional::{function_component, use_state, use_effect};
use yew::prelude::*;

fn main() {
    // ConsoleService::info("Hello, world!");
    App::<UseState>::new().mount_to_body();
}

#[function_component(UseState)]
pub fn state() -> Html {
    let (
        clicked,
        set_clicked,
    ) = use_state(|| false);

    let clicked_clone = clicked.clone();
    let onclick = Callback::from(move |_| set_clicked(!*clicked_clone));

    let clicked_clone = clicked.clone();
    use_effect(move || {
        ConsoleService::info(&format!("{}", clicked_clone));
        || {}
    });

    html! {
        <>
            <button class=format!("py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md focus:outline-none{test}", test = if *clicked { " animate-ping" } else { "" }) onclick=onclick>{ "Increment value" }</button>
            { "test" }
        </>
    }
}