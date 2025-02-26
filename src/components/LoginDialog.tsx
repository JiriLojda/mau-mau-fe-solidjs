import { type Component, createSignal, onMount } from "solid-js";
import { button, dialog, error as errorClass, form, input } from "./LoginDialog.module.css";

type Props = Readonly<{
  onLogin: (userName: string) => Promise<void>;
}>;

export const LoginDialog: Component<Props> = props => {
  let dialogRef: HTMLDialogElement | undefined;
  const [userName, setUserName] = createSignal("");
  const [error, setError] = createSignal<string | null>(null);
  const [isLoading, setIsLoading] = createSignal(false);

  onMount(() => {
    dialogRef?.showModal();
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!userName()) return;

    setIsLoading(true);
    setError(null);

    try {
      await props.onLogin(userName());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog ref={dialogRef} class={dialog}>
      <form class={form} onSubmit={handleSubmit}>
        <h2>Welcome to Mau-Mau</h2>
        <input
          class={input}
          type="text"
          placeholder="Enter your name"
          value={userName()}
          onInput={e => setUserName(e.currentTarget.value)}
          disabled={isLoading()}
          required
          minLength={1}
          maxLength={20}
          pattern="[a-zA-Z0-9 ]+"
          title="Only letters, numbers and spaces are allowed"
        />
        {error() && <div class={errorClass}>{error()}</div>}
        <button type="submit" class={button} disabled={isLoading()}>
          {isLoading() ? "Connecting..." : "Join Game"}
        </button>
      </form>
    </dialog>
  );
};
