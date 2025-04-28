export const getCourseCoverImageUrl = (
  courseId: string,
  coverImage: string,
) => {
  const url = `${process.env.CLOUDFLARE_R2_DEV_URL}/${process.env.CLOUDFLARE_R2_BUCKET}/courses/${courseId}/${coverImage}`
  const dummy =
    "https://ghoi475aya.ufs.sh/f/6yzUEvM7HzIaB2qDBE5OchqikwjSFJ83y2AzXpolrb5W0sCf"

  console.log(url, dummy)
  return dummy
}
