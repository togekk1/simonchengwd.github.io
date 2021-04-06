use yew_services::{ConsoleService};
use yew_functional::{function_component, use_state};
use yew::prelude::*;
use std::rc::Rc;

fn main() {
    ConsoleService::info("Hello, world!");
    App::<UseState>::new().mount_to_body();
}

#[function_component(UseState)]
pub fn state() -> Html {
    let (
        counter,
        set_counter,
    ) = use_state(|| 0);
    let onclick = {
        let counter = Rc::clone(&counter);
        Callback::from(move |_| set_counter(*counter + 1))
    };

    html! {
        <div>
            <button onclick=onclick>{ "Increment value" }</button>
            <p>
                <b>{ "Current value: " }</b>
                { counter }
            </p>
        </div>
    }
}