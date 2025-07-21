import styles from "./loading.module.css";

interface LoadingProps {
  isLoading: boolean;
}

export default function Loading({ isLoading }: LoadingProps) {
  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-black/60 select-none">
        <main className={styles.main}>
          <span className={`${styles.span} ${styles.span1}`}>.</span>
          <span className={`${styles.span} ${styles.span2}`}>.</span>
          <span className={`${styles.span} ${styles.span3}`}>.</span>
          <span className={`${styles.span} ${styles.span4}`}>.</span>
        </main>
      </div>
    );
  }
}
